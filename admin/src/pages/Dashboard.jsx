import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, RefreshCw, DollarSign, ShoppingBag, Package, Star, Plus, ArrowUpRight, Clock3, Truck, CheckCircle2, Layers3, CreditCard, TrendingUp, Calendar, Search, AlertCircle } from 'lucide-react'
import { backendUrl, currency } from '../App'

const Dashboard = ({ token }) => {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [range, setRange] = useState('all')
  const [quickQuery, setQuickQuery] = useState('')
  const [now, setNow] = useState(() => new Date())

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const fetchDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true)
      else setLoading(true)

      const requests = [axios.get(backendUrl + '/api/product/list')]
      if (token) {
        requests.push(axios.post(backendUrl + '/api/order/list', {}, { headers: { token } }))
      }

      const [productRes, orderRes] = await Promise.allSettled(requests)

      if (productRes.status === 'fulfilled' && productRes.value.data.success) {
        setProducts(productRes.value.data.products || [])
      } else if (productRes.status === 'rejected') {
        toast.error('Failed to load products overview')
      }

      if (orderRes && orderRes.status === 'fulfilled' && orderRes.value.data.success) {
        setOrders([...(orderRes.value.data.orders || [])].reverse())
      } else if (orderRes && orderRes.status === 'rejected') {
        toast.error('Failed to load orders overview')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Failed to load dashboard')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [token])

  const filteredOrdersByRange = useMemo(() => {
    if (range === 'all') return orders
    const currentMs = Date.now()
    const dayMs = 24 * 60 * 60 * 1000

    if (range === 'today') {
      const startOfDay = new Date()
      startOfDay.setHours(0, 0, 0, 0)
      return orders.filter((o) => Number(o.date || 0) >= startOfDay.getTime())
    }

    const days = range === '7d' ? 7 : 30
    return orders.filter((o) => Number(o.date || 0) >= currentMs - days * dayMs)
  }, [orders, range])

  const stats = useMemo(() => {
    const totalProducts = products.length
    const bestSellers = products.filter((p) => Boolean(p.bestSeller ?? p.bestseller)).length

    const categoryMap = {}
    products.forEach((p) => {
      const cat = p.category || 'Uncategorized'
      categoryMap[cat] = (categoryMap[cat] || 0) + 1
    })
    const categoryBreakdown = Object.entries(categoryMap)
      .map(([name, count]) => ({
        name,
        count,
        percent: totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count)

    const scopedOrders = filteredOrdersByRange
    const totalOrders = scopedOrders.length
    const totalRevenue = scopedOrders.reduce((sum, o) => sum + Number(o.amount || 0), 0)
    const paidRevenue = scopedOrders.filter((o) => Boolean(o.payment)).reduce((sum, o) => sum + Number(o.amount || 0), 0)
    const pendingRevenue = Math.max(0, totalRevenue - paidRevenue)
    const unpaidOrdersCount = scopedOrders.filter((o) => !o.payment).length
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    const todayOrdersCount = orders.filter((o) => Number(o.date || 0) >= startOfToday.getTime()).length

    const codCount = scopedOrders.filter((o) => (o.paymentMethod || '').toUpperCase() === 'COD').length
    const onlineCount = Math.max(0, totalOrders - codCount)

    const processing = scopedOrders.filter((o) => o.status === 'Order Placed' || o.status === 'Packing').length
    const inTransit = scopedOrders.filter((o) => o.status === 'Shipped' || o.status === 'Out for delivery').length
    const delivered = scopedOrders.filter((o) => o.status === 'Delivered').length

    const itemCountMap = {}
    scopedOrders.forEach((order) => {
      ;(order.items || []).forEach((item) => {
        const key = item.name || 'Item'
        itemCountMap[key] = (itemCountMap[key] || 0) + Number(item.quantity || 1)
      })
    })
    const topOrderedItems = Object.entries(itemCountMap)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 4)

    return {
      totalProducts,
      bestSellers,
      categoriesCount: categoryBreakdown.length,
      categoryBreakdown,
      totalOrders,
      totalRevenue,
      paidRevenue,
      pendingRevenue,
      unpaidOrdersCount,
      todayOrdersCount,
      avgOrderValue,
      codCount,
      onlineCount,
      processing,
      inTransit,
      delivered,
      topOrderedItems
    }
  }, [products, orders, filteredOrdersByRange])

  const formatMoney = (val) => Number(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'Shipped':
      case 'Out for delivery':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Packing':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200'
    }
  }

  const recentOrders = useMemo(() => {
    const q = quickQuery.trim().toLowerCase()
    const base = q
      ? filteredOrdersByRange.filter((o) => {
          const fullName = [o.address?.firstName, o.address?.lastName].filter(Boolean).join(' ').toLowerCase()
          const oid = (o._id || '').toLowerCase()
          const phone = String(o.address?.phone || '').toLowerCase()
          return fullName.includes(q) || oid.includes(q) || phone.includes(q)
        })
      : filteredOrdersByRange
    return base.slice(0, 5)
  }, [filteredOrdersByRange, quickQuery])

  const recentProducts = useMemo(() => [...products].reverse().slice(0, 5), [products])

  const liveDateLabel = now.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
  const liveTimeLabel = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-5 border-b border-neutral-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
              <LayoutDashboard size={16} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">EASYBUY / EXECUTIVE OVERVIEW</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-neutral-700 shadow-2xs">
              <Calendar size={12} className="text-neutral-500" />
              {liveDateLabel} · <span className="font-semibold text-neutral-950">{liveTimeLabel}</span>
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
            Store <span className="font-serif italic font-normal">Dashboard</span>
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Today&apos;s orders: <span className="font-semibold text-neutral-900">{stats.todayOrdersCount}</span> · Unpaid payments: <span className="font-semibold text-orange-600">{stats.unpaidOrdersCount}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center rounded-xl border border-neutral-200 bg-white p-1 shadow-2xs">
            {[
              { id: 'all', label: 'All' },
              { id: 'today', label: 'Today' },
              { id: '7d', label: '7D' },
              { id: '30d', label: '30D' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRange(tab.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${range === tab.id ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button type="button" onClick={() => navigate('/add')} className="flex h-10 items-center gap-2 rounded-xl bg-black px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-neutral-800">
            <Plus size={15} />
            Add Product
          </button>

          <button type="button" onClick={() => fetchDashboardData(true)} disabled={refreshing} className="flex h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-xs font-semibold text-neutral-700 shadow-sm transition hover:bg-neutral-50 disabled:opacity-60">
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-16 text-center shadow-sm">
          <div className="mx-auto mb-3 h-9 w-9 animate-spin rounded-full border-2 border-neutral-200 border-t-black" />
          <p className="text-sm font-medium text-neutral-900">Loading store analytics...</p>
          <p className="mt-1 text-xs text-neutral-500">Syncing products and orders from database.</p>
        </div>
      ) : (
        <>
          {stats.unpaidOrdersCount > 0 && (
            <div className="mb-5 flex flex-col justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2.5 text-xs text-amber-900">
                <AlertCircle size={16} className="shrink-0 text-amber-700" />
                <span>
                  <strong className="font-semibold">{stats.unpaidOrdersCount}</strong> {stats.unpaidOrdersCount === 1 ? 'order has' : 'orders have'} pending payment ({currency}{formatMoney(stats.pendingRevenue)}).
                </span>
              </div>
              <button type="button" onClick={() => navigate('/orders')} className="w-fit rounded-lg bg-amber-900 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-black">
                Review Orders
              </button>
            </div>
          )}

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950 p-5 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Gross Revenue</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
                  <DollarSign size={17} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight">{currency}{formatMoney(stats.totalRevenue)}</p>
              <p className="mt-2 text-xs text-neutral-400">
                Paid: <span className="font-medium text-emerald-400">{currency}{formatMoney(stats.paidRevenue)}</span> · Due: <span className="font-medium text-amber-300">{currency}{formatMoney(stats.pendingRevenue)}</span>
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Orders ({range.toUpperCase()})</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800">
                  <ShoppingBag size={17} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">{stats.totalOrders}</p>
              <p className="mt-2 text-xs text-neutral-500">Avg. order: <span className="font-semibold text-neutral-800">{currency}{formatMoney(stats.avgOrderValue)}</span></p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Catalog Products</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800">
                  <Package size={17} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">{stats.totalProducts}</p>
              <p className="mt-2 text-xs text-neutral-500">Across {stats.categoriesCount} {stats.categoriesCount === 1 ? 'category' : 'categories'}</p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Best Sellers</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Star size={17} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">{stats.bestSellers}</p>
              <p className="mt-2 text-xs text-neutral-500">Featured in Top Picks storefront</p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Fulfillment Pipeline</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-amber-50/80 p-2.5">
                  <Clock3 size={15} className="mx-auto text-amber-600" />
                  <p className="mt-1 text-base font-semibold text-neutral-950">{stats.processing}</p>
                  <p className="text-[10px] text-neutral-500">Processing</p>
                </div>
                <div className="rounded-xl bg-blue-50/80 p-2.5">
                  <Truck size={15} className="mx-auto text-blue-600" />
                  <p className="mt-1 text-base font-semibold text-neutral-950">{stats.inTransit}</p>
                  <p className="text-[10px] text-neutral-500">In Transit</p>
                </div>
                <div className="rounded-xl bg-emerald-50/80 p-2.5">
                  <CheckCircle2 size={15} className="mx-auto text-emerald-600" />
                  <p className="mt-1 text-base font-semibold text-neutral-950">{stats.delivered}</p>
                  <p className="text-[10px] text-neutral-500">Delivered</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Checkout Mix</p>
                <CreditCard size={15} className="text-neutral-400" />
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-3 py-2 text-xs">
                  <span className="font-medium text-neutral-700">Cash on Delivery (COD)</span>
                  <span className="font-semibold text-neutral-950">{stats.codCount} orders</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-3 py-2 text-xs">
                  <span className="font-medium text-neutral-700">Online / Other Methods</span>
                  <span className="font-semibold text-neutral-950">{stats.onlineCount} orders</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Category Distribution</p>
                <Layers3 size={15} className="text-neutral-400" />
              </div>
              <div className="mt-3 space-y-2.5">
                {stats.categoryBreakdown.length === 0 ? (
                  <p className="py-4 text-center text-xs text-neutral-400">No categories yet</p>
                ) : (
                  stats.categoryBreakdown.slice(0, 3).map((cat) => (
                    <div key={cat.name}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-medium text-neutral-800">{cat.name}</span>
                        <span className="text-neutral-500">{cat.count} ({cat.percent}%)</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                        <div className="h-full rounded-full bg-black" style={{ width: `${cat.percent}%` }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.45fr_1fr]">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Activity Feed</p>
                  <h2 className="mt-0.5 text-lg font-semibold text-neutral-950">Recent Orders</h2>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      value={quickQuery}
                      onChange={(e) => setQuickQuery(e.target.value)}
                      placeholder="Order ID, name, phone..."
                      className="h-8 w-40 rounded-lg border border-neutral-200 bg-neutral-50 pl-7 pr-2.5 text-xs text-neutral-900 outline-none focus:border-black focus:bg-white sm:w-48"
                    />
                  </div>

                  <button type="button" onClick={() => navigate('/orders')} className="flex h-8 items-center gap-1 rounded-lg border border-neutral-200 px-3 text-xs font-semibold text-neutral-700 transition hover:border-black hover:bg-black hover:text-white">
                    All Orders
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>

              {recentOrders.length === 0 ? (
                <div className="rounded-xl border border-dashed border-neutral-200 py-10 text-center text-sm text-neutral-500">
                  {quickQuery ? 'No matching orders found.' : 'No orders recorded for this period.'}
                </div>
              ) : (
                <div className="divide-y divide-neutral-100">
                  {recentOrders.map((order) => {
                    const customer = [order.address?.firstName, order.address?.lastName].filter(Boolean).join(' ')
                    return (
                      <div key={order._id} onClick={() => navigate('/orders')} className="flex cursor-pointer flex-col justify-between gap-2 py-3.5 transition hover:bg-neutral-50/70 sm:flex-row sm:items-center sm:rounded-xl sm:px-2">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold text-neutral-950">#{order._id?.slice(-8)}</span>
                            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getStatusBadge(order.status)}`}>{order.status || 'Order Placed'}</span>
                            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${order.payment ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-orange-200 bg-orange-50 text-orange-700'}`}>
                              {order.payment ? 'Paid' : 'Unpaid'}
                            </span>
                          </div>
                          <p className="mt-1 truncate text-xs text-neutral-500">
                            {customer || 'Customer'} · {formatDate(order.date)} · {order.items?.length || 0} {(order.items?.length || 0) === 1 ? 'item' : 'items'}
                          </p>
                        </div>

                        <p className="text-sm font-semibold text-neutral-950">{currency}{formatMoney(order.amount)}</p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Inventory</p>
                    <h2 className="mt-0.5 text-lg font-semibold text-neutral-950">Latest Products</h2>
                  </div>

                  <button type="button" onClick={() => navigate('/list')} className="flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-black hover:bg-black hover:text-white">
                    Inventory
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                {recentProducts.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-neutral-200 py-8 text-center text-sm text-neutral-500">No products in catalog yet.</div>
                ) : (
                  <div className="divide-y divide-neutral-100">
                    {recentProducts.map((item) => (
                      <div key={item._id} className="flex items-center justify-between gap-3 py-2.5">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                            <img src={item.image?.[0]} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-neutral-900">{item.name}</p>
                            <p className="text-[10px] text-neutral-500">{item.category || 'General'}</p>
                          </div>
                        </div>
                        <span className="shrink-0 text-xs font-semibold text-neutral-950">{currency}{Number(item.price || 0).toLocaleString('en-US')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Demand</p>
                    <h2 className="mt-0.5 text-base font-semibold text-neutral-950">Most Ordered Items</h2>
                  </div>
                  <TrendingUp size={16} className="text-neutral-400" />
                </div>

                {stats.topOrderedItems.length === 0 ? (
                  <p className="py-4 text-center text-xs text-neutral-400">Order item trends will appear once orders come in.</p>
                ) : (
                  <div className="space-y-2">
                    {stats.topOrderedItems.map((entry, idx) => (
                      <div key={entry.name} className="flex items-center justify-between rounded-xl bg-neutral-50 px-3 py-2 text-xs">
                        <span className="truncate font-medium text-neutral-800">
                          <span className="mr-2 text-[10px] font-bold text-neutral-400">#{idx + 1}</span>
                          {entry.name}
                        </span>
                        <span className="shrink-0 font-semibold text-neutral-950">{entry.qty} sold</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
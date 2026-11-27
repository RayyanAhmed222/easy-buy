const pendingSignups = new Map();

const setPendingSignup = (email, data, ttlMs = 10 * 60 * 1000) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = pendingSignups.get(normalizedEmail);

    if (existing?.timer) {
        clearTimeout(existing.timer);
    }

    const timer = setTimeout(() => {
        pendingSignups.delete(normalizedEmail);
    }, ttlMs);

    if (typeof timer.unref === "function") {
        timer.unref();
    }

    pendingSignups.set(normalizedEmail, {
        ...data,
        email: normalizedEmail,
        expiresAt: Date.now() + ttlMs,
        timer
    });
};

const getPendingSignup = (email) => {
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail) return null;

    const record = pendingSignups.get(normalizedEmail);
    if (!record) return null;

    if (Date.now() > record.expiresAt) {
        deletePendingSignup(normalizedEmail);
        return null;
    }

    return record;
};

const incrementPendingAttempts = (email) => {
    const record = getPendingSignup(email);
    if (!record) return 0;

    record.attempts += 1;
    pendingSignups.set(record.email, record);
    return record.attempts;
};

const deletePendingSignup = (email) => {
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail) return;

    const record = pendingSignups.get(normalizedEmail);
    if (record?.timer) {
        clearTimeout(record.timer);
    }
    pendingSignups.delete(normalizedEmail);
};

export {
    setPendingSignup,
    getPendingSignup,
    incrementPendingAttempts,
    deletePendingSignup
};
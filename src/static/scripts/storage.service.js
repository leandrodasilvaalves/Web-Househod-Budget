const storage = {
    setItem: (key, value) => localStorage.setItem(key, value),
    getItem: key => localStorage.getItem(key),
    removetItem: key => localStorage.removeItem(key),
}

export default storage;
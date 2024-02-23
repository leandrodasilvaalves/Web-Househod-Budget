import storage from "../utils/storage.utils";

export default function () {
    const theme = storage.getItem('theme');
    if (theme) {
        footer.setTheme(theme);
    }
    footer.darkTheme.addEventListener('change', () => {
        footer.setTheme(footer.darkTheme.checked ? 'dark' : 'light');
    });
};

const footer = {
    darkTheme: document.getElementById('darkTheme'),
    setTheme: theme => {
        document.documentElement.setAttribute('data-bs-theme', theme)
        storage.setItem('theme', theme);
        footer.darkTheme.checked = theme == 'dark' ? true : false;
    },
};
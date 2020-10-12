
const Utils = module.exports = {}

// Transforma um texto qualquer em um texto "safe" em HTML
// https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
Utils.escapeHTML = function escapeHtml(unsafe) {
    return unsafe && unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
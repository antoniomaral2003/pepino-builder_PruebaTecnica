
let selectedColor = "#000";  // start as black
let selectedFormat = "svg";  // start as SVG

// los gets
const mySVG = document.getElementById("mySVG");
const mainSwatches = document.getElementById("mainSwatches");
const downloadIcon = document.getElementById("downloadIcon");
const downloadModal = document.getElementById("downloadModal");
const closeModalBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const downloadBtn = document.getElementById("downloadBtn");
const formatRadios = document.getElementsByName("fileFormat");
const modalSwatches = document.querySelectorAll(".modal-swatch");
const dropdownContent = document.querySelector(".dropdown-content");
const downloadOriginal = document.querySelector(".d-original");
const downloadAs = document.querySelector(".d-as");


/**********************************************
 * 1) cambios de color en pag principal
 **********************************************/
mainSwatches.addEventListener("click", (e) => {
    const swatch = e.target.closest(".color-swatch");
    if (!swatch) return;

    const newColor = swatch.dataset.color;
    setColor(newColor);
});

/** Helper to recolor the inline SVG + store selected color. */
function setColor(newColor) {
    selectedColor = newColor;
    // Recolor all shapes in the SVG
    mySVG.querySelectorAll("*").forEach(el => {
        el.setAttribute("fill", newColor);
    });
    // Also highlight the chosen swatch in the modal if open
    highlightModalSwatch(newColor);
}

/**********************************************
 * 2) MODAL LOGIC: open/close
 **********************************************/
downloadIcon.addEventListener("click", () => {
    dropdownContent.classList.toggle("show-dropdown");
});

window.addEventListener("click", (e) => {
    if (!e.target.matches(downloadIcon)) {
        dropdownContent.classList.remove("show-dropdown");
    }
});

downloadOriginal.addEventListener("click", () => {
    downloadAsSVG();
    dropdownContent.classList.remove("show-dropdown");
});

downloadAs.addEventListener("click", () => {

    downloadModal.classList.remove("hidden");
    // Sync the current color in the modal
    highlightModalSwatch(selectedColor);
    // Sync the current format in the modal
    updateDownloadButtonLabel();

});

closeModalBtn.addEventListener("click", () => {
    downloadModal.classList.add("hidden");
});

cancelBtn.addEventListener("click", () => {
    downloadModal.classList.add("hidden");
});

/**********************************************
 * 3) MODAL: choose format + color
 **********************************************/
formatRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
        selectedFormat = e.target.value;
        updateDownloadButtonLabel();
    });
});

modalSwatches.forEach(swatch => {
    swatch.addEventListener("click", () => {
        const newColor = swatch.dataset.color;
        setColor(newColor);
    });
});

/** Pronunciar la seleccion en pag extra*/
function highlightModalSwatch(color) {
    modalSwatches.forEach(s => {
        s.style.outline = (s.dataset.color === color) ? "2px solid blue" : "none";
    });
}

/** Actualizar boton de formato escogido */
function updateDownloadButtonLabel() {
    downloadBtn.textContent = `Descargar como ${selectedFormat.toUpperCase()}`;
}

/**********************************************
 * 4) Descarga
 **********************************************/
downloadBtn.addEventListener("click", () => {
    if (selectedFormat === "svg") {
        downloadAsSVG();
    } else {
        downloadAsRaster(selectedFormat);
    }
    downloadModal.classList.add("hidden");
});

/**
 * DOWNLOAD AS SVG
 * Serialize the current inline SVG, create a Blob, then trigger download.
 */
function downloadAsSVG() {
    const svgClone = mySVG.cloneNode(true);
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgClone);

    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "logo-recolored.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

/**
 * DOWNLOAD AS PNG/JPG/WEBP
 * 1) Serialize the SVG to a string
 * 2) Convert to base64 data URL
 * 3) Draw onto a canvas
 * 4) Export canvas to chosen format
 */
function downloadAsRaster(format) {
    const svgClone = mySVG.cloneNode(true);
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgClone);

    const svgBase64 = "data:image/svg+xml;base64," + btoa(svgString);

    const img = new Image();
    img.onload = () => {
        // Determine the canvas size from the viewBox or fallback
        let viewBox = mySVG.getAttribute("viewBox");
        let width = 300, height = 300; // default fallback
        if (viewBox) {
            let parts = viewBox.split(" ");
            // parts: [minX, minY, width, height]
            width = parseFloat(parts[2]);
            height = parseFloat(parts[3]);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        // If user wants JPG, fill canvas white first (no transparency in JPG)
        if (format === "jpg") {
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, width, height);
        }

        // For PNG/WEBP, we keep transparency, so the checkerboard is not actually exported.
        // The final file will have a transparent background.
        ctx.drawImage(img, 0, 0, width, height);

        let mime = "image/png";
        let ext = "png";
        if (format === "jpg") {
            mime = "image/jpeg";
            ext = "jpg";
        } else if (format === "webp") {
            mime = "image/webp";
            ext = "webp";
        }

        const dataURL = canvas.toDataURL(mime, 1.0);

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `logo-recolored.${ext}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    img.src = svgBase64;
}

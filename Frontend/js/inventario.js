import { obtainCategories } from "../apiConnection/consumeApi.js";

document.addEventListener("DOMContentLoaded", () => {
  getCategories();

  // Capturar el formulario
  const formulario = document.querySelector("#formulario");
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const descripcion = document.querySelector("#descripcion").value;
    const imagenInput = document.querySelector("#imagen");

    // Por ahora, solo usamos el nombre del archivo como string
    const imagen = imagenInput.files[0]?.name || "";

    const nuevaCategoria = {
      CategoriaNombre: nombre,
      Descripcion: descripcion,
      Imagen: imagen,
    };

    try {
      await fetch("http://localhost:5000/api/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaCategoria),
      });

      // Refrescar tabla
      getCategories();

      // Resetear formulario y cerrar modal
      formulario.reset();
      const modal = bootstrap.Modal.getInstance(
        document.querySelector("#registerCategory")
      );
      modal.hide();
    } catch (error) {
      console.error("Error al crear categoría:", error);
    }
  });
});

async function getCategories() {
  const categoriesObtained = await obtainCategories();
  const container = document.querySelector("tbody");
  container.innerHTML = ""; // limpiar antes de pintar

  categoriesObtained.forEach((category) => {
    const { CategoriaID, CategoriaNombre, Descripcion, Imagen } = category;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${CategoriaID}</td>
      <td>${CategoriaNombre}</td>
      <td>${Descripcion}</td>
      <td><img src="${Imagen}" width="100px" class="cuenta"></td>
      <td><button class="btn color3">Details</button></td>
      <td><button class="btn color2">Edit</button></td>
      <td><button class="btn color5" data-id="${CategoriaID}">Delete</button></td>
    `;
    container.appendChild(row);
  });

  // Agregar evento a los botones de borrar
  addDeleteListeners();
}

function addDeleteListeners() {
  const deleteButtons = document.querySelectorAll("button[data-id]");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      const confirmDelete = confirm(
        "¿Seguro que deseas eliminar esta categoría?"
      );
      if (!confirmDelete) return;

      try {
        await fetch(`http://localhost:5000/api/categorias/${id}`, {
          method: "DELETE",
        });
        getCategories();
      } catch (error) {
        console.error("Error al eliminar categoría:", error);
      }
    });
  });
}

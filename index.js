const formCrear = document.querySelector("#form-crear");
const inputNombre = document.querySelector("#nombre");
const inputEmail = document.querySelector("#email");
const inputTelefono = document.querySelector("#telefono");
const inputDireccion = document.querySelector("#direccion");
const formEditar = document.getElementById("form-editar");
const inputNombreEditado = document.getElementById("nombre-editado");
const inputEmailEditado = document.getElementById("email-editado");
const inputTelefonoEditado = document.getElementById("telefono-editado");
const inputDireccionEditado = document.getElementById("direccion-editado");
const botonEditar = document.getElementById("submit-editar");
// funciones auxiliares
const crearBotonesBorrar = () => {
	const botonesBorrar = document.querySelectorAll(".boton-borrar");
	for (let i = 0; i < botonesBorrar.length; i++) {
		botonesBorrar[i].onclick = () => {
			const idDelUsuarioABorrar = botonesBorrar[i].dataset.id;
			borrarUsuario(idDelUsuarioABorrar);
		};
	}
};
const borrarUsuario = (id) => {
	console.log("Borrando usuario", id);
	fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			obtenerUsuarios();
		});
};

const crearTablaHTML = (data) => {
	const tabla = document.querySelector("#tabla");
	const html = data.reduce(
		(acc, curr) => {
			return (
				acc +
				`  
    <tr>
      <td>${curr.fullname}</td>
      <td>${curr.email}</td>
      <td>${curr.address}</td>
      <td>${curr.phone}</td>
      <td>
      <button class="boton-borrar" data-id="${curr.id}">Borrar usuario</button>
      <button class="boton-editar" data-id="${curr.id}">Editar usuario</button>
      </td>
    </tr>
    `
			);
		},
		`
    <tr>
      <th>Nombre</th>
      <th>Email</th>
      <th>Direccion</th>
      <th>Telefono</th>
      <th>Acciones</th>
    </tr>
    `
	);

	tabla.innerHTML = html;
	crearBotonesBorrar();
	crearBotonesEditar();
};

const obtenerUsuarios = () => {
	fetch("https://601da02bbe5f340017a19d60.mockapi.io/users")
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			crearTablaHTML(data);
		});
};

// funciones de eventos

obtenerUsuarios();

formCrear.onsubmit = (e) => {
	e.preventDefault();
	const nuevoUsuario = {
		fullname: inputNombre.value,
		phone: inputTelefono.value,
		address: inputDireccion.value,
		email: inputEmail.value,
	};

	fetch("https://601da02bbe5f340017a19d60.mockapi.io/users", {
		method: "POST",
		body: JSON.stringify(nuevoUsuario),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			obtenerUsuarios();
		});
};

//funcion editar usuarios
let idDelUsuarioAEditar = "";

const crearBotonesEditar = () => {
	const botonesEditar = document.querySelectorAll(".boton-editar");
	for (let i = 0; i < botonesEditar.length; i++) {
		botonesEditar[i].onclick = () => {
			console.log("prueba");
			idDelUsuarioAEditar = botonesEditar[i].dataset.id;
			formCrear.classList.add("ocultar");
			formEditar.classList.remove("ocultar");
		};
	}
};

botonEditar.onclick = (e) => {
	e.preventDefault();
	editarUsuario(idDelUsuarioAEditar);
};

const editarUsuario = (id) => {
	const nuevoUsuarioEditado = {
		fullname: inputNombreEditado.value,
		phone: inputTelefonoEditado.value,
		address: inputDireccionEditado.value,
		email: inputEmailEditado.value,
	};
	console.log(nuevoUsuarioEditado);
	fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
		method: "PUT",
		body: JSON.stringify(nuevoUsuarioEditado),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			obtenerUsuarios();
		});
};

import {
  storage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  db,
  collection,
  addDoc,
  getDocs,
} from "./firebase.js";

let form = document.querySelector("form");
let addPro = document.querySelector("#addPro");
let fileInput = document.getElementById("fileInput");
let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let input3 = document.getElementById("input3");
let addBtn = document.getElementById("addBtn");
let start = document.getElementById("start");
let cancel = document.getElementById("cencel");
let stop = document.getElementById("stop");
let uploadActions = document.getElementById("uploadActions");
let state = document.querySelector(".state");
let loader = document.querySelector(".ldr");
let loadr = document.querySelector(".loadr");

let uploadTask;
let getImg;

//#region === extra

fileInput.addEventListener("change", function () {
  if (fileInput.files.length > 0) {
    uploadActions.classList.remove("d-none");
  } else {
    uploadActions.classList.add("d-none");
  }
});

//#endregion

//#region ===1
addPro.addEventListener("click", () => {
  form.style.display = "block";
});
addPro.addEventListener("dblclick", () => {
  form.style.display = "none";
});
//#endregion
//#region ===2
const uploadFile = (event) => {
  event.preventDefault();
  loadr.style.display = "block"; 
  let file = fileInput.files[0];

  if (file.size > 5242880) {
    loadr.style.display = "none"; 
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Sorry, the file is larger than 5MB",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  } else {
    const imagesRef = ref(storage, `image/${file.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress === 100) {
          state.innerHTML = "";
        } else {
          state.innerHTML = "Upload is " + progress.toFixed(2) + "% done";
        }

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        loadr.style.display = "none";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      },
      () => {
        loadr.style.display = "none";
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          getImg = downloadURL;
          console.log("File available at", downloadURL);
        });
      }
    );
  }
};

start.addEventListener("click", () => {
  console.log(start);
  uploadTask.resume();
});
stop.addEventListener("click", () => {
  console.log(stop);
  uploadTask.pause();
});
cancel.addEventListener("click", () => {
  console.log(cancel);
  uploadTask.cancel();
});

fileInput.addEventListener("change", uploadFile);
//#endregion

//#region ===All products===>(3)
const AddData = async (event) => {
  event.preventDefault();


  loader.style.display = "block";

  if (!getImg) {
    Swal.fire({
      icon: "error",
      title: "Image not uploaded",
      text: "Please wait for the image to upload before submitting.",
    });

    loader.style.display = "none";
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "Products"), {
      name: input1.value,
      category: input2.value,
      price: input3.value,
      image: getImg,
    });

    Swal.fire({
      title: docRef.id,
      text: "Your data has been successfully uploaded.",
      icon: "success",
    });
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }


  loader.style.display = "none";
};

addBtn.addEventListener("click", AddData);

//#endregion
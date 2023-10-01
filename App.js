document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded! 🚀");
  const uploadForm = document.getElementById("uploadForm");
  const fileInput = document.getElementById("fileInput");
  const uploadButton = document.getElementById("uploadButton");

  uploadForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Form submitted!");

    const files = fileInput.files;

    if (files.length === 0) {
      alert("Please select a file to upload.");
      return;
    }

    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      try {
        const response = await fetch("/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("Response data:", data);

        if (response.status === 200) {
          alert("File(s) uploaded successfully!");
        } else if (response.status === 400 && data.message) {
          alert(data.message);
        } else {
          alert(
            "An error occurred while uploading the file(s). Please try again later."
          );
        }
      } catch (error) {
        alert("An error occurred:", error.message);
      }
    }
  });

  const showFilesButton = document.getElementById("showFiles");
  const filesDiv = document.querySelector(".files"); 

  showFilesButton.addEventListener("click", () => {
    if (filesDiv.classList.contains("files-sec")) {
      filesDiv.classList.remove("files-sec"); 
    } else {
      filesDiv.classList.add("files-sec");
    }
    fetch("/filelist")
      .then((response) => response.json())
      .then((data) => {
        const filesDiv = document.querySelector(".files");
        filesDiv.innerHTML = "";
        const fileNames = data.files;
        fileNames.forEach((fileName) => {
          const fileElement = document.createElement("div");
          fileElement.textContent = fileName;
          filesDiv.appendChild(fileElement);
        });
      })
      .catch((error) => {
        console.error("Error fetching file list:", error.message);
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const showProfileButton = document.getElementById("showProfile");
  const card = document.querySelector(".card");

  showProfileButton.addEventListener("click", function () {
    if (card.classList.contains("hidden")) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden"); 
    }
  });
});

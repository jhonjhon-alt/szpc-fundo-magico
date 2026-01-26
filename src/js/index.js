document.addEventListener("DOMContentLoaded", function () {

})


const form = document.querySelector(".form-group");
const input = document.getElementById("description");
const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");
const preview = document.getElementById("preview-section");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const description = input.value.trim();

    if (!description) {
        return;
    }

    setLoading(true);

    try {
        const response = await fetch("https://jhonnnn.app.n8n.cloud/webhook/fundo-magico", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ description })
    });

    const data = await response.json();
    htmlCode.textContent = data.code || "";
    cssCode.textContent = data.style || "";

    preview.style.display = "block";
    preview.innerHTML = data.code || "";

    let styleTag = document.getElementById("dynamic-style");

    if(styleTag){
        styleTag.remove();
    }

    if(data.style){
        styleTag = document.createElement("style");
        styleTag.id = "dynamic-style";
        styleTag.textContent = data.style;
        document.head.appendChild(styleTag);
    }

    }catch (error) {
        console.error("Erro ao gerar o fundo mágico:", error);
        htmlCode.textContent = "Não consegui gerar o HTML. Tente novamente.";
        cssCode.textContent = "Não consegui gerar o CSS. Tente novamente.";
        preview.innerHTML = "";

    }finally{
        setLoading(false);
    }

});


function setLoading(isLoading) {
    const button = document.getElementById("btn-text");

    if (isLoading) {
        button.innerHTML = "gerando backgraund...";
    } else {
        button.innerHTML = "Gerar Background Mágico";
    }

}


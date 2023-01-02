export const validateField = (field, message = "This field is required") => {
    function insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }
    function removeElementsByClass(curField, className) {
        const elements = curField.parentNode.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
    let curField = document.getElementsByName(field)[0];
    removeElementsByClass(curField, "invalid-feedback");
    window.scrollTo(500, 0);
    curField.classList.add("border-danger");
    curField.classList.add("border-danger");
    let error = document.createElement("div");
    error.classList.add("invalid-feedback", "text-start");
    error.textContent = message;
    error.style.display = "block";
    insertAfter(error, curField);
};

export const unValidateFields = () => {
    function removeElementsByClass(curField, className) {
        const elements = curField.parentNode.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
    let fields = document.getElementsByClassName('form-control');
    Array.from(fields, (i, index) => {
        removeElementsByClass(fields[index], "invalid-feedback");
        fields[index].classList.remove("border-danger");
    })
};

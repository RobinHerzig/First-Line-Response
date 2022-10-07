const items = {
    games: [{label: "Hello", val: 12}, {label: "Goodbye", val: 24}],
    foods: [{label: "Hello", val: 12}, {label: "Goodbye", val: 24}]
};

const app = document.querySelector('#app');

const parentForm = document.createElement('form');
renderArrayForm(parentForm, 'games', items.games)
renderArrayForm(parentForm, 'foods', items.foods)
app.append(parentForm);
const submitButton = document.createElement('button');
submitButton.type = "submit";
submitButton.innerText = "Submit"
parentForm.append(submitButton);
addFormListener(parentForm);

/**
 * @param {HTMLFormElement} parentForm
 * @param {string} groupName
 * @param {Array<{label: string, val: any}>} items
 */
function renderArrayForm(parentForm, groupName, items) {
    const itemEls = items.map((item, i) => {
        const label = document.createElement('label');
        label.innerText = item.label;
        const input = document.createElement('input');
        input.value = item.val;
        input.name = `${groupName}${i}`
        label.append(input);
        return label;
    })

    parentForm.append(...itemEls);
}

function addFormListener(parentForm) {
    parentForm.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // `.keys()` is not an array, but gives an ArrayLike :(
        // [...] turns it back into an array :)
        // games1, games2, food1, food2
        const inputNames = [...formData.keys()];

        // {games: [item1, item2], food: [item1, item2]}
        const groups = {};

        const values = inputNames.map(inputName => {
            // Find the input with `name="formItemN"`
            const inputEl = document.querySelector(`[name="${inputName}"]`);
            const groupName = inputName.replace(/[0-9]+$/, '');
            const itemNumber = inputName.replace(groupName, '');

            if (!groups[groupName]) groups[groupName] = [];
            console.log({groupName, itemNumber})
            groups[groupName][Number(itemNumber)] = {
                label: inputEl.labels[0].innerText,
                val: inputEl.value
            };
        })

        console.log(groups)
    }
}
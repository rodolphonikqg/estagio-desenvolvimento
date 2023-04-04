const buttons = document.querySelectorAll('td');
let displayText = '';
let hasDot = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {

        const buttonText = button.textContent;

        if (buttonText === '⌫') {
            displayText = displayText.toString();
            const lastChar = displayText.charAt(displayText.length - 1);
            if (lastChar === '.') hasDot = false;
            displayText = displayText.slice(0, -1);
            return document.querySelector('td[colspan="4"]').textContent = displayText;
        }

        if (buttonText === 'C') {
            displayText = '';
            hasDot = false;
            return document.querySelector('td[colspan="4"]').textContent = displayText;
        }

        if (['+', '-', '/', '*'].includes(buttonText)) {
            hasDot = false;
        }

        if (buttonText === '.') {
            const lastChar = displayText.charAt(displayText.length - 1);
            if (lastChar >= 0 && lastChar <= 9 && !hasDot) {
                displayText = displayText + buttonText;
                hasDot = true;
                return document.querySelector('td[colspan="4"]').textContent = displayText;
            }
            return document.querySelector('td[colspan="4"]').textContent = displayText;
        }

        if (buttonText === '=') {
            const answer = eval(document.querySelector('td[colspan="4"]').textContent);
            displayText = answer;
            console.log(displayText)
            return document.querySelector('td[colspan="4"]').textContent = displayText;
        }

        if (buttonText === 'x²') {
            displayText *= displayText;
            return document.querySelector('td[colspan="4"]').textContent = displayText;
        }

        if (buttonText === '√') {
            displayText = Math.sqrt(displayText);
            return document.querySelector('td[colspan="4"]').textContent = displayText;
        }

        displayText = displayText + buttonText;

        document.querySelector('td[colspan="4"]').textContent = displayText;

    })
})
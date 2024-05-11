const result = document.querySelector('.input-display p');
const buttons = document.querySelectorAll('.number-box button, .number-box1 button');
let expression = '';
let isOperatorClicked = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    switch (value) {
      case 'clear':
        expression = '';
        result.textContent = '0';
        break;
      case 'delete':
        expression = expression.slice(0, -1);
        result.textContent = expression || '0';
        break;
      case '=':
        try {
          const calculatedResult = eval(expression);
          result.textContent = calculatedResult;
          expression = calculatedResult.toString();
          isOperatorClicked = false;
        } catch (error) {
          result.textContent = 'Error';
          expression = '';
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
        if (isOperatorClicked) {
          expression = expression.slice(0, -1) + value;
        } else {
          expression += value;
        }
        result.textContent = expression;
        isOperatorClicked = true;
        break;
      default:
        if (expression === '0') {
          expression = value;
        } else if (isOperatorClicked) {
          expression += value;
          isOperatorClicked = false;
        } else {
          expression += value;
        }
        result.textContent = expression;
    }
  });
});
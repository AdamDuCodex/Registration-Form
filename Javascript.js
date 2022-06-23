const [form] = document.forms;
const [usernameFeedback, passwordFeedback, confirmPasswordFeedback] = document.querySelectorAll('.feedback');

const isUsernameValid = username => {
  return username.length > 5 && username.length <=20 
}

const isPasswordValid = password => {
  return password.length > 8 && password.length <=20;
}

const isPasswordMatch = (password, confirmPassword) => {
  return !!confirmPassword && password === confirmPassword; 
}

const validation = (username, password, confirmPassword) => {
  return (
    isUsernameValid(username) &&
    isPasswordValid(password) &&
    isPasswordMatch(password, confirmPassword)
  );
}

const toggleShowPassword = (toggler, elements) => {
  toggler.addEventListener('change', e => {
    elements.forEach(element => {
      element.setAttribute('type', e.target.checked ? 'text' : 'password');
    });
  });
}

const getElement = (name, e) => {
  return {
    username(e){
      e.target.classList.toggle('border-danger', !isUsernameValid(e.target.value));
      usernameFeedback.textContent = isUsernameValid(e.target.value) ? null : 'Username must be at least 5 to 20 characters long';
    },
    
    password(e){
      e.target.classList.toggle('border-danger', !isPasswordValid(e.target.value));
      passwordFeedback.textContent = isPasswordValid(e.target.value) ? null : 'Password must be at least 8 to 20 characters long';
    },
    
    confirmPassword(e){
      e.target.classList.toggle('border-danger', !isPasswordMatch(form.password.value, e.target.value));
      confirmPasswordFeedback.textContent = isPasswordMatch(form.password.value, e.target.value) ? null : 'Password do not match';
    }
  }[name](e);
}

const handleInput = e => {
  const { username, password, confirmPassword, btn } = form;
  const { name } = e.target;
  getElement(name, e);
 btn.disabled = !validation(username.value, password.value, confirmPassword.value);
}

document.addEventListener('DOMContentLoaded', () => {
  toggleShowPassword(form.showPassword, [form.password, form.confirmPassword]);
  form.username.addEventListener('input', handleInput);
  form.password.addEventListener('input', handleInput);
  form.confirmPassword.addEventListener('input', handleInput);
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    const { username, password, confirmPassword } = e.target;
    const submittedValue = {
      username: username.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    };
    
    console.log(submittedValue);
    
    const date = new Date();
    const timestampInMs = date.getTime();

   const unixTimestamp = Math.floor(date.getTime() / 1000);
    localStorage.setItem(`user${unixTimestamp}`, JSON.stringify(submittedValue));
  });
});
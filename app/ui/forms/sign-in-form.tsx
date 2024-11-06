import Link from 'next/link';

//Форма входа в систему
const SignInForm = () => {
  return (
    <div className='form-div'>
    {/* <form action={signIn} className="form">
      <input name="email" placeholder="Email или логин" />
      <input name="password" type="password" placeholder="Пароль" />
      <button className='button' type="submit">Войти в систему</button>
    </form>
    <p>Еще нет аккаунта?</p>
    <Link href="/auth/sign-up">Зарегистрироваться</Link> */}
    </div>
  );
};

export { SignInForm };
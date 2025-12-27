function LogIn() {
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="id" />
        <input type="password" placeholder="password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LogIn;

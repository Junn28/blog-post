import { useRouter } from 'next/router';

export default function AddUser() {
  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    const dataUser = {
      name: e.target.name.value,
      gender: e.target.gender.value,
      email: e.target.email.value,
      status: e.target.status.value,
    };
    const dataJson = JSON.stringify(dataUser);
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 9790edbfff496f9264e925ed95933e72406eb166598fdd1df4ee1cd8f589f21d',
        'Content-Type': 'application/json',
      },
      body: dataJson,
    };
    const res = await fetch('https://gorest.co.in/public/v2/users', options);

    router.reload();
  };

  return (
    <>
      <div className="modal">
        <form className="modal-content" onSubmit={submitHandler}>
          <label htmlFor="name">Name</label>
          <input className="item-form" type="text" name="name" id="name" placeholder="your name" required />
          <label htmlFor="email">Email</label>
          <input className="item-form" type="email" name="email" id="email" placeholder="your email" required />
          <label htmlFor="gender">Gender</label>
          <input className="item-form" type="text" name="gender" id="gender" placeholder="your gender" required />
          <label htmlFor="status">Status</label>
          <select className="item-form" id="status" name="status" required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="btn-wrapper">
            <button className="btn submit" type="submit">
              submit
            </button>
            <button
              className="btn cancel"
              type="reset"
              onClick={() => {
                document.querySelector('.modal').style.display = 'none';
              }}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

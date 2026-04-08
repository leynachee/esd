const BASE = import.meta.env.VITE_USER_SERVICE_URL;

export const createOutSystemsUser = async ({ name, email, phone, bankAccount, qualifications }) => {
  const res = await fetch(`${BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      UserName: name,
      UserEmail: email,
      UserPhoneNo: phone || '',
      UserBankAccount: bankAccount || '',
      UserQualifications: qualifications || '',
    }),
  });
  if (!res.ok) throw new Error('OutSystems user creation failed');
  return res.json(); // { UserId, Success, Message }
};

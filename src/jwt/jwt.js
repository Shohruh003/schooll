import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    // Boshqa ma'lumotlarni ham payload ga qo'shishingiz mumkin
  };

  const secretKey = 'your-secret-key'; // O'zingizning maxfiy kalitingiz
  const expiresIn = '1h'; // Tokenning amal qilish muddati (masalan, 1 soat)

  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
};

export default generateToken;
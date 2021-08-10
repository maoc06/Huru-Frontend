import jwtDecode from 'jwt-decode';
import firebaseAdmin from '../../../../app/lib/firebase-admin';

export default async (req, res) => {
  // console.log('REQ', req.body);
  try {
    const {
      token: {
        data: { accessToken },
      },
    } = req.body;
    const { info: user } = jwtDecode(accessToken);

    const data = {
      birthday: user.dateOfBirth,
      cc: user.identityDocument,
      email: user.email,
      last_name: user.lastName,
      name: user.firstName,
      phone: user.phone,
      picture: user.profilePicture,
      uid: user.uid,
    };

    await firebaseAdmin
      .collection('req_verify')
      .doc(user.uid)
      .set({
        ...data,
        req_date: new Date(),
        type: 'verify-account',
      });

    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};

import firebaseAdmin from '../../../../app/lib/firebase-admin';

export default async (req, res) => {
  try {
    const data = req.body;

    const images = data.images;
    delete data.images;

    await firebaseAdmin
      .collection('req_verify')
      .doc(data.id.toString())
      .set({
        ...data,
        req_date: new Date(),
        type: 'verify-car',
      });

    Promise.all(
      images.map(async (image) => {
        await firebaseAdmin
          .collection('req_verify')
          .doc(data.id.toString())
          .collection('images')
          .doc(image.carImageId.toString())
          .set({ url: image.imagePath });
      })
    );

    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

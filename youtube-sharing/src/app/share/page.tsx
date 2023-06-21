import ShareForm from '../widgets/ShareVideoForm';

export default async function Share() {
  return (
    <div className="w-1/2 flex items-center justify-center bg-gray-100">
      <div className="relative bg-white w-full p-10 rounded">
        <p className="absolute top-0 left-0 -mt-3 ml-3 px-2 bg-white text-black">
          Share a Youtube movie
        </p>
        <ShareForm />
      </div>
    </div>
  );
}

import { educationContent } from "../data/educationContent";

export default function Education() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Belajar Tentang Cryptocurrency
      </h1>
      {educationContent.map((item) => (
        <div key={item.id} className="mb-6 bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
          <p className="text-gray-300">{item.content}</p>
        </div>
      ))}
    </div>
  );
}

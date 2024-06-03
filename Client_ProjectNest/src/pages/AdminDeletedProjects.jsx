import React from "react";

function Deletedprojects() {
  const num_of_cards = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="flex flex-wrap">
      {num_of_cards.map((card, i) => (
        <div key={i} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2   p-4">
          <div className="bg-gray-100 rounded shadow-lg h-full text-black flex flex-col justify-between">
            <div>
              <div className="bg-blue-950 text-white p-4 rounded-t">
                <h1 className="font-bold text-center">Project Name: Test</h1>
              </div>
              <div className="p-4">
                <p className="mb-2">
                  <span className="font-semibold mr-2">Team Members: </span>{" "}
                  Ravi, Sushankhya, Mohit, Arun, Someone
                </p>
                <p className="mb-2">
                  <span className="font-semibold mr-2">
                    Project Description:{" "}
                  </span>{" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tenetur, ad dolor id atque est numquam, incidunt quod sint
                  repellat corrupti laboriosam reprehenderit non, natus
                  quibusdam quas optio soluta! Veritatis, aperiam.
                </p>
                <p>
                  <span className="font-semibold mr-2">Supervisor: </span> None
                </p>
              </div>
            </div>
            <button className="w-full text-center bg-blue-900 hover:bg-blue-600 text-white py-2 px-4 rounded-b">
              Restore
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deletedprojects;

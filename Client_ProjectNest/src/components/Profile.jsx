export default function Profile() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
          <img src="https://picsum.photos/536/400" alt="profile" />
        </div>
        <div className="p-6 text-center">
          <h4 className="mb-2 font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-800 antialiased">
            Sushankhya Chapagain
          </h4>
          <p className="bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
            Role: Student
          </p>
          <p className="bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
            Projects Enrolled: Student
          </p>
          <p className="bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
            Email: sc@gmail.com
          </p>
        </div>
      </div>

      <link
        rel="stylesheet"
        href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
      />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
        integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
        crossOrigin="anonymous"
      />
    </div>
  );
}

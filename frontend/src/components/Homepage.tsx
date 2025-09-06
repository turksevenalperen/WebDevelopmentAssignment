import { Link } from "react-router-dom"

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
     
      <header className="bg-white border-b border-gray-200 py-6 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
            Web Development Assignment
          </h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        
          <section className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              Users
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Manage user accounts and profiles
            </p>

            <div className="space-y-3">
              <Link
                to="/users"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View Users
              </Link>
              <Link
                to="/users/create"
                className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Add User
              </Link>
            </div>
          </section>

          
          <section className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              Posts
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Create and manage posts
            </p>

            <div className="space-y-3">
              <Link
                to="/posts"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View Posts
              </Link>
              <Link
                to="/posts/create"
                className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Add Post
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Homepage

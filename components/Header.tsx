import Link from 'next/link'

function Header() {
  return (
    <header
      className={` mx-auto flex max-w-7xl items-center justify-between    p-4`}
    >
      <div>
        <Link href="/">
          <img
            className="w-44 cursor-pointer object-contain"
            src="/logo1.png"
            alt="logo"
          />
        </Link>
      </div>
      <div>
        <ul className="hidden items-center space-x-5 md:inline-flex">
          <li className="cursor-pointer hover:text-gray-400"> Our Story</li>
          <li className="cursor-pointer hover:text-gray-400">Membership</li>
          <li className="cursor-pointer hover:text-gray-400">Write</li>
          <li className="cursor-pointer hover:text-gray-400">Sign In</li>
        </ul>
        <button className="ml-5 rounded-full bg-black px-5 py-3 text-white  hover:text-slate-400">
          Get Started
        </button>
      </div>
    </header>
  )
}

export default Header

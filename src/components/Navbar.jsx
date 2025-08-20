import logoDigitalHero from '../../public/logo.png'

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex items-center justify-center">
      <a href="/" className='flex items-center justify-center'>
        <img src={logoDigitalHero} alt="logo" />
        <h1 className='text-2xl uppercase font-semibold'>News</h1>
      </a>
    </nav> 
  )
}

export default Navbar
const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home">
      <h1>Welcome to Cars R us</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque et nihil quis ducimus cum, ex, quo odit voluptatem enim aspernatur perspiciatis illum ipsum voluptas accusantium, tempore delectus neque cupiditate qui!</p>
      <hr/>
      <p>Check out our Best selling <Link to="/car?ctg=bestSeller&isVip=true" >cars!</Link></p>
    </section>
  )
}
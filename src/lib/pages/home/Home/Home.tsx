import Head from "next/head";

import { HomeProps as Props } from "./Home.types";
import Hero from "lib/components/Hero/Hero";
import Testimonial from "lib/components/Testimonial/Testimonial";
import RecentlyPosts from "lib/components/RecentlyPosts/RecentlyPosts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home: React.FC<Props> = props => {
  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <main className="Home__main">
        <Hero />
        <RecentlyPosts />
        <Testimonial />
      </main>
      <footer className="Home__footer" />
    </>
  );
};

Home.defaultProps = {};

export default Home;

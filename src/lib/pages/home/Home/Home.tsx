import Head from "next/head";

import { HomeProps as Props } from "./Home.types";

const Home: React.FC<Props> = props => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <header className="Home__header" />
      <main className="Home__main">
        <h1>Home</h1>
      </main>
      <footer className="Home__footer" />
    </>
  );
};

Home.defaultProps = {};

export default Home;

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from "../src/Navbar";
import Footer from "../src/Footer";
import Impact from "../src/Impact";
import Investment from "../src/InvestmentPloicy";
import Team from "../src/Team";
import Testimonial from "../src/Testimonial";
import Resources from "../src/Resources";
import WorkTogether from "../src/WorkTogether";

export default function Home() {
    function clickhandler(){

    }
  return (
    <div className={styles.Root}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className={styles.mainContainer}>
            <div className={styles.top_contianer}>
                <Navbar clickhandler={clickhandler}/>
                <div className={styles.top_contianer_content}>
                    <h1 className={styles.hero_heading}>
                        Accelerate your journey
                    </h1>
                    <p className={styles.hero_subheading}>
                        with&nbsp;
                            <a>
                                <span>String Advantage</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                                     className="feather feather-arrow-up-right"><line x1="7" y1="17" x2="17" y2="7"></line><polyline
                                    points="7 7 17 7 17 17"></polyline></svg>
                            </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

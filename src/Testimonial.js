import styles from "../styles/Testimonial.module.css";
import {useState} from "react";

const testimonials = [
    {name:"Prashant Mahajan", designation:"Founder HealthIntel", quote:"Blah Blah Blah", image:"http://healthintel.ai/wp-content/uploads/2019/09/MAHAJAN_Prashant4x5-whitecoat.jpg"},
    {name:"Prashant Mahajan", designation:"Founder HealthIntel", quote:"Blah Blah Blah", image:"http://healthintel.ai/wp-content/uploads/2019/09/MAHAJAN_Prashant4x5-whitecoat.jpg"},
    {name:"Prashant Mahajan", designation:"Founder HealthIntel", quote:"Blah Blah Blah", image:"http://healthintel.ai/wp-content/uploads/2019/09/MAHAJAN_Prashant4x5-whitecoat.jpg"}
    ];

const Testimonial = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    return (
        <div className={styles.Testimonial_container}>
            <div className={styles.Testimonial_cotent_conainer}>
                <div className={styles.Testimonial_content_left_title}>
                    Testimonials
                </div>
                <div className={styles.Testimonial_content_left_subtitle}>
                    What founder says.
                </div>
                <div className={styles.Testimonial_cotent_grid}>
                    <div className={styles.Testimonial_Quote}>
                        {
                            '"'+testimonials[currentTestimonial].quote+'"'
                        }
                    </div>
                    <div className={styles.Testimonial_People}>
                        {
                            testimonials.map((testi, i) => {
                                return (
                                    <div onClick={() => {setCurrentTestimonial(i)}} className={i === currentTestimonial?styles.Testimonial_people_card_border:styles.Testimonial_people_card}>
                                        <img src={testi.image}/>
                                        <div className={styles.Testimonial_people_card_name}>
                                            <div className={styles.Testimonial_people_card_name_name}>
                                                {testi.name}
                                            </div>
                                            <div className={styles.Testimonial_people_card_name_subname}>
                                                {testi.designation}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;

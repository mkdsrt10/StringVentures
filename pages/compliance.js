import ComplianceCard from "../components/complance";
import styles from "../styles/compliance.module.css";

export default function Compliance(){
    return (
        <div className={styles.main}>
            <ComplianceCard compliant={true} name={"FDA"} head={"U.S. Food & Drug Administration - Compliance Policy Guide"} law={"FDA CPG Sec 400.900"}
            lawname={"Class I Recalls of Prescription Drugs"} details={{detials:"When there is a Class I recall of a prescription drug, retail level consignees (retail, hospital, nursing home pharmacists) will be required to review their prescription files for the appropriate time period consistent with the period of distribution of the drug, in order to identify all customers to whom the recalled drug was dispensed.",
            penalty: ["Up to $100,000 for a misdemeanor by an individual that does not result in death.", "Up to $200,000 for a misdemeanor by a corporation that does not result in death."
            , "Up to $250,000 for a misdemeanor by an individual that results in death, or a felony.", "Up to $500,000 for a misdemeanor by a corporation that results in death, or a felony."]}}/>

            <ComplianceCard compliant={true} name={"DEA"} head={"U.S. Department of Justice - Drug Enforcement Administration"} law={"DEA Title 21, CFR 1304.22 (c)"}
                            lawname={"Records of actors"} details={{detials:"Each person registered or authorized to dispense or conduct research with controlled substances shall maintain records with the same information required of manufacturers pursuant to paragraph (a)(2)(i), (ii), (iv), (vii), and (ix) of this section.",
                penalty: ["333(b)(2)(A) - Penalty for violations related to drug samples resulting in a conviction of any representative of manufacturer or distributor in any 10-year period - $107,050",
                    "333(b)(2)(B) - Penalty for violation related to drug samples resulting in a conviction of any representative of manufacturer or distributor after the second conviction in any 10-yr period - $2,184,670"]}}/>

            <ComplianceCard compliant={true} name={"EPA"} head={"United States Environmental Protection Agency"} law={"42 U.S.C. 6928(e)"}
                            lawname={"Hazardous Waste Management - Knowing Endangerment  - Federal Enforcement"} details={{detials:"Knowing Endangerment where a person knowingly transports, treats, stores, disposes of, or exports a hazardous waste in violation of 42 U.S.C. 6928(d)(1) - (7) and\n" +
                    "Knew that such acts put another person in imminent danger of death or serious bodily injury",
                penalty: ["Any person who violates any requirement shall be liable to the United States for a civil penalty in an amount not to exceed $25,000 for each such violation. Each day of such violation shall, for purposes of this subsection, constitute a separate violation."]}}/>

            <ComplianceCard compliant={true} name={"FDA"} head={"U.S. Food & Drug Administration - Code of Federal Regulations"} law={"FDA Sec. 203.34 "}
                            lawname={"Policies and Procedures; Administrative Systems"} details={{detials:"Conducting the annual physical inventory and preparation of the reconciliation report\n" +
                    "(4) Storage of drug samples by representatives;\n" +
                    "(c) Identifying any significant loss of drug samples and notifying FDA of the loss; and\n" +
                    "(d) Monitoring any loss or theft of drug samples.",
                penalty: ["Up to $100,000 for a misdemeanor by an individual that does not result in death.", "Up to $200,000 for a misdemeanor by a corporation that does not result in death."
                    , "Up to $250,000 for a misdemeanor by an individual that results in death, or a felony.", "Up to $500,000 for a misdemeanor by a corporation that results in death, or a felony."]}}/>

            <ComplianceCard compliant={true} name={"DEA"} head={"U.S. Department of Justice - Drug Enforcement Administration"} law={"DEA Title 21, CFR 1304.03(b)"}
                            lawname={"Persons required to keep records and file reports"} details={{detials:"(b) A registered individual practitioner is required to keep records, as described in § 1304.04, of controlled substances in Schedules II, III, IV, and V (including samples) which are dispensed, other than by prescribing or administering in the lawful course of professional practice.",
                penalty: []}}/>

            <ComplianceCard compliant={true} name={"DEA"} head={"U.S. Department of Justice - Drug Enforcement Administration"} law={"Title 21, CFR Section 1301.71(a)"}
                            lawname={"Security requirements generally"} details={{detials:"All applicants and registrants shall provide effective controls and procedures to guard against theft and diversion of controlled substances.",
                penalty: []}}/>
        </div>
    )
}

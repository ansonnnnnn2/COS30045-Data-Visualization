# Exercise 3: Communicating Data Insights

**Unit:** COS30045 Data Visualisation  
**Student Name:** Tan Jin Shern  
**Institution:** Swinburne University of Technology  

---

## 1. Data Story

### Audience
The primary audience for this data story consists of everyday Australian household consumers, apartment renters, and home entertainment enthusiasts looking to balance visual performance upgrades against recurring electricity bills. 

### Audience Interest in the Visualisation
With domestic energy tariffs rising across residential networks, consumers frequently evaluate retail displays based strictly on shelf sticker prices without factoring in lifetime operating costs. 

Because modern living room displays have shifted from 40-inch baselines up to 65-inch and 75-inch panels, consumers need an intuitive, evidence-based visual model to understand how physical screen area drives power usage. This visualisation allows potential buyers to:
* Identify how power draw scales exponentially with screen real estate.
* Recognise efficiency discrepancies between panel backlighting types within the exact same size tier.
* Use the integrated interactive calculator to forecast customized annual and monthly running expenses in local currency before committing to a purchase.

---

## 2. About the Data

### Data Source
The dataset is acquired from the official Australian Energy Rating registration database for domestic televisions, administered under the Greenhouse and Energy Minimum Standards (GEMS) regulatory scheme. The dataset catalogs certified appliance models, diagonal physical measurements (in centimetres), screen resolution tiers, Star Ratings, and standardised comparative annual energy consumption figures (measured in kWh/year based on 10 hours of daily operation).

### Data Processing
Data cleaning and feature engineering were executed using the KNIME Analytics Platform:
1. **Filtering & Quality Control:** Removed incomplete entries, uncertified test prototypes, and duplicate registrations to isolate active commercial retail consumer models.
2. **Dimension Conversion:** The raw dataset recorded screen diagonal dimensions in centimetres. Using a Math Formula node, values were normalised into standard consumer display inches by dividing by 2.54 and rounding to the nearest integer ($cm / 2.54$). This clustered models cleanly into standard retail categories (e.g., 43", 50", 55", 65", 75", 85").
3. **Outlier Verification:** Screen size to energy consumption ranges were audited to ensure extreme high-wattage industrial displays did not distort consumer-level metrics.

### Privacy
The underlying records consist strictly of public regulatory compliance test declarations and manufacturer product specifications. The dataset contains zero Personally Identifiable Information (PII), individual consumer usage logs, household telemetry, or commercial transactional data. Handling and presenting this dataset introduces no individual privacy risks.

### Accuracy and Limitations
* **Standardised Duty Cycle:** Annual consumption (kWh/year) figures are calculated using a standardised laboratory duty cycle (10 hours on / 14 hours standby). Actual household consumption will vary depending on user habits, HDR usage, local backlighting dimming zones, and ambient sensor settings.
* **Rapid Technological Turnaround:** Retail TV ranges update frequently; newly introduced Micro-LED or modern high-efficiency OLEDs may exhibit superior efficiency profiles not captured in earlier regulatory registration cycles.
* **Measurement Approximation:** Converting continuous diagonal centimetre measurements into rounded integer inches creates discrete column clusters, grouping together slight physical variations within common panel brackets.

### Ethics
* **Zero Baseline & Honest Framing:** Scatter plots maintain standard continuous scaling to prevent artificial visual distortion of comparative power draw between size groups.
* **Vendor-Neutral Reporting:** No single manufacturer or display brand is unfairly penalized or highlighted; the data emphasizes underlying panel physics and energy tiers to empower honest consumer decision-making.
* **Transparent Guidance:** Visual takeaways clearly distinguish between size-driven increases and efficiency differences to ensure consumers are not misled into believing all large displays are equally costly to operate.

---

## 3. AI Declaration

**Generative AI Tool:** Google Gemini  
**Assistance Provided:**
* Structuring semantic HTML5 markup and responsive CSS styling for cross-device compatibility.
* Designing and implementing vanilla JavaScript DOM manipulation routines for the interactive FAQ accordion and input-validated appliance energy calculator.
* Reviewing and refining narrative copy to communicate data visualization principles clearly to general consumer audiences.
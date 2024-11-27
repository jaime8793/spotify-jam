import { ResponsiveRadar } from "@nivo/radar";

const TrackFeaturesRadarChart = ({ data }) => {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveRadar
        data={data}
        keys={["value"]}
        indexBy="feature"
        maxValue={100}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: "color" }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={36}
        enableDots={true}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        dotBorderColor={{ from: "color" }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{ scheme: "nivo" }}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="wobbly"
      />
    </div>
  );
};

export default TrackFeaturesRadarChart;

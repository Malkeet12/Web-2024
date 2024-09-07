import { Tabs } from "antd";

import Autocomplete from "./components/autocomplete/Autocomplete";
import { InfiniteScrollComponent } from "./components/infiniteScrollComponent/InfiniteScrollComponent";
import { FileExplorer } from "./components/fileExplorer/FileExplorer";
import { JiraVelocity } from "./components/jiraVelocity/jiraVelocity";
import { TicTacToe } from "./components/tictactoe/tictactoe";
import { Tweet } from "./components/tweet/tweet";
import { Shape } from "./components/shape/shape";
import { ProgressbarContainer } from "./components/progressbar/progressbarHard";
import { OverlappingCircle } from "./components/overlappingCircle/overlappingCircle";
import { Calendar } from "./components/calendar/calendar";
// import { FeatureFlagContainer } from "./practice/featureflagtest/featureFlag";

export default function App() {
  const items = [
    {
      key: "1",
      label: "Autocomplete",
      children: <Autocomplete />,
    },
    {
      key: "2",
      label: "InfiniteScrollComponent",
      children: <InfiniteScrollComponent />,
    },
    {
      key: "3",
      label: "FileExplorer",
      children: <FileExplorer />,
    },
    {
      key: "4",
      label: "JiraVelocitybar",
      children: <JiraVelocity />,
    },
    {
      key: "5",
      label: "TicTacToe",
      children: <TicTacToe />,
    },
    {
      key: "6",
      label: "Tweet",
      children: <Tweet />,
    },
    {
      key: "7",
      label: "interactive shapes",
      children: <Shape />,
    },
    {
      key: "8",
      label: "progress",
      children: <ProgressbarContainer />,
    },
    {
      key: "9",
      label: "Calendar",
      children: <Calendar />,
    },
  ];
  // return <OverlappingCircle />
  return (
    <div className="App">
      <Tabs defaultActiveKey="9" items={items} />
    </div>
  );
}

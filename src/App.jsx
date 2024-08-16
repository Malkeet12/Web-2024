import { Tabs } from "antd";

import Autocomplete from "./components/autocomplete/Autocomplete";
import { InfiniteScrollComponent } from "./components/infiniteScrollComponent/InfiniteScrollComponent";
import { FileExplorer } from "./components/fileExplorer/FileExplorer";
import { JiraVelocity } from "./components/jiraVelocity/jiraVelocity";
import { TicTacToe } from "./components/tictactoe/tictactoe";
import { Tweet } from "./components/tweet/tweet";

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
  ];
  return (
    <div className="App">
      <Tabs defaultActiveKey="6" items={items} />
    </div>
  );
}

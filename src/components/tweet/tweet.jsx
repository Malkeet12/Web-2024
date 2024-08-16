import { EditFilled } from "@ant-design/icons";
import "./index.scss";

export const Tweet = () => {
  return (
    <article>
      <img
        src="https://xsgames.co/randomusers/avatar.php?g=male"
        width="48"
        height="48"
      />
      <section>
        <header>John Doe</header>
        <div className="message">Some message</div>
        <div className="actions">
          <EditFilled></EditFilled>
        </div>
      </section>
    </article>
  );
};

import CardGrid from "../components/Grid";

const Dokumente: React.FC = () => {
  return (
    <div>
      <h2>Bewerbungen</h2>
      <p>Hier werden alle Bewerbungen angezeigt.</p>
      <p>Leiste mit Buttons und Filter/Suchfunktionen muss noch eingefügt werden.</p>
      <p>Außerdem sollte Text oben ebenfalls noch in Container mit Padding gepackt werde.</p>
      <CardGrid />
    </div>
  );
};

export default Dokumente;
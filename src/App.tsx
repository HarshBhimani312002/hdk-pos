import { useEffect } from "react";
import { supabase } from "./services/supabase";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("Current Session:", data.session);
    });
  }, []);

  return <AppRoutes />;
}

export default App;
import { useEffect } from "react";
import { getTEJ } from "../../http/requests";
import TEJStore from "../../store/TEJStore";

export default function useTEJ(TEJ: TEJStore) {
  useEffect(() => {
    if (!TEJ.justification[0]) {
      getTEJ(TEJ);
    }
  }, []);
}

import { Construction, Anchor, Factory, Building2, Truck, ClipboardCheck, Route, Fuel, Zap, Layers, Wrench, HardHat, ShieldCheck, Award, MapPin, Cpu, BadgeCheck } from "lucide-react";
const map = { Construction, Anchor, Factory, Building2, Truck, ClipboardCheck, Route, Fuel, Zap, Layers, Wrench, HardHat, ShieldCheck, Award, MapPin, Cpu, BadgeCheck };
export default function Icon({ name, ...props }) {
  const C = map[name] || Construction;
  return <C {...props} />;
}

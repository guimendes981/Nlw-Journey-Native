import {
  Text,
  TextProps,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { createContext, useContext } from "react";
import clsx from "clsx";

type Variants = "primary" | "secondary";

type ButtonProps = TouchableOpacityProps & {
  variant?: Variants;
  isLoading?: boolean;
};

const ThemeContext = createContext<{ variant?: Variants }>({});

function Button({
  variant = "primary",
  children,
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <ThemeContext.Provider value={{ variant }}>
        {isLoading ? <ActivityIndicator className="text-lime-950" /> : children}
      </ThemeContext.Provider>
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
const { variant } = useContext(ThemeContext);

  return (
    <Text
      className={clsx("text-base font-semibold", {
        "text-lime-950": variant == "primary",
        "text-zinc-200": variant === "secondary",
      })}
    >
      {children}
    </Text>
  );
}

Button.Title = Title;

const styles = StyleSheet.create({
  button: {
    width: "100%", // Equivalent to w-full
    textAlign: "center", // Equivalent to text-center
    color: "#1a202c", // Equivalent to text-slate-900, adjust the color as needed
    height: 44, // Based on the TailwindCSS h-11 (11 * 4 = 44)
    flexDirection: "row", // Equivalent to flex-row
    alignItems: "center", // Equivalent to items-center
    justifyContent: "center", // Equivalent to justify-center
    borderRadius: 8, // Adjusted for rounded-lg
    //bg-zinc-500
    backgroundColor: "#f9fafb", // Equivalent to bg-zinc-500, adjust the color as needed
  },
});

export { Button };

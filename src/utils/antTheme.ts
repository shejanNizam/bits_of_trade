export const lightTheme = {
  token: {
    colorPrimary: "#2563EB",
    colorInfo: "#1183bd",
    colorBgBase: "#ffffff",
    colorTextBase: "#000000",
  },
  components: {
    Table: {
      colorTextHeading: "#2563EB",
      colorText: "#000000",
      colorBorder: "#000000",
    },
    Menu: {
      colorBgContainer: "#ffffff",
      colorText: "#1183bd",
      colorItemHoverBg: "#e6f7ff",
      colorItemSelectedBg: "#2563EB",
      colorItemSelectedText: "#ffffff",
      iconSize: 24,
    },
    Button: {
      colorPrimary: "#2563EB",
      colorTextDisabled: "#000000",
      colorPrimaryHover: "#2083d4",
      colorPrimaryActive: "#2083d4",
      colorBgContainerDisabled: "#ffffff",
      borderRadius: 6,
      fontSize: 14,
      controlHeight: 50,
      boxShadow: "0 0px 0 rgba(5, 145, 255, 0.1)",
    },
    Progress: {
      defaultColor: "#2563EB",
      colorSuccess: "#2563EB",
    },
    Form: {
      labelColor: "#000000", // Dark text for light mode
      labelFontFamily: "'Raleway', sans-serif",
      labelFontWeight: 700,
      labelFontSize: 16,
      labelLineHeight: 24,
      inputFontFamily: "'Raleway', sans-serif",
      inputFontWeight: 400,
      inputFontSize: 14,
      inputLineHeight: 20,
    },
    Input: {
      colorBorder: "#2563EB",
      colorTextPlaceholder: "#666666",
      borderRadius: 4,
      controlHeight: 40,
    },
    InputPassword: {
      colorBorder: "#2563EB",
      borderRadius: 4,
      controlHeight: 80,
      colorTextPlaceholder: "#666666",
    },
    InputNumber: {
      colorBorder: "#666666",
    },
    Select: {
      colorBorder: "#2563EB",
      borderRadius: 8,
      controlHeight: 40,
      colorTextPlaceholder: "#666666",
    },
    DatePicker: {
      colorBorder: "#2563EB",
      colorTextPlaceholder: "#000000",
      colorIcon: "#2563EB",
      activeBg: "rgba(255, 255, 255, 0)",
    },
    Collapse: {
      colorText: "#000000",
      colorIcon: "#000000",
      headerBg: "transparent",
      colorBorder: "#000000",
      colorFillAlter: "transparent",
    },
    Modal: {
      colorBgContainer: "#ffffff",
      borderRadius: 20,
    },
    Tabs: {
      itemActiveColor: "#2563EB",
      colorPrimary: "#2563EB",
      colorText: "#2563EB",
      colorTextHeading: "#2563EB",
      colorBorderSecondary: "#2563EB",
      itemColor: "#666666",
      itemSelectedColor: "#2563EB",
      itemHoverColor: "#2563EB",
      inkBarColor: "#2563EB",
      titleFontSize: 16,
      horizontalItemGutter: 32,
    },
    Drawer: {
      colorBgElevated: "#ffffff",
      colorText: "#000000",
      colorTextHeading: "#ffffff",
      padding: 24,
      borderRadius: 8,
    },
  },
};

export const darkTheme = {
  token: {
    colorPrimary: "#2563EB",
    colorInfo: "#1183bd",
    colorBgBase: "#141414",
    colorTextBase: "#ffffff",
  },
  components: {
    Table: {
      colorTextHeading: "#2563EB",
      colorText: "#ffffff",
      colorBorder: "#303030",
      colorBgContainer: "#12203b",
      colorBgBody: "#12203b",
      colorBgHeader: "#0d1628",
      colorHeaderBg: "#0d1628",
      rowHoverBg: "#1a2d4e",
      rowSelectedBg: "#1e3a5f",
      rowSelectedHoverBg: "#234a7a",
    },
    Menu: {
      colorBgContainer: "#141414",
      colorText: "#1183bd",
      colorItemHoverBg: "#1f1f1f",
      colorItemSelectedBg: "#2563EB",
      colorItemSelectedText: "#ffffff",
      iconSize: 24,
    },
    Button: {
      colorPrimary: "#2563EB",
      colorTextDisabled: "#666666",
      colorPrimaryHover: "#2083d4",
      colorPrimaryActive: "#2083d4",
      colorBgContainerDisabled: "#1f1f1f",
      borderRadius: 6,
      fontSize: 14,
      controlHeight: 50,
      boxShadow: "0 0px 0 rgba(5, 145, 255, 0.1)",
    },
    Progress: {
      defaultColor: "#2563EB",
      colorSuccess: "#2563EB",
    },
    Form: {
      labelColor: "#ffffff", // White text for dark mode
      labelFontFamily: "'Raleway', sans-serif",
      labelFontWeight: 700,
      labelFontSize: 16,
      labelLineHeight: 24,
      inputFontFamily: "'Raleway', sans-serif",
      inputFontWeight: 400,
      inputFontSize: 14,
      inputLineHeight: 20,
    },
    Input: {
      colorBorder: "#2563EB",
      colorTextPlaceholder: "#999999",
      colorBgContainer: "#12203b", // Input background color
      colorText: "#ffffff", // Input text color
      borderRadius: 4,
      controlHeight: 40,
    },
    InputPassword: {
      colorBorder: "#2563EB",
      borderRadius: 4,
      controlHeight: 80,
      colorTextPlaceholder: "#999999",
      colorBgContainer: "#12203b", // Password input background
      colorText: "#ffffff", // Password input text
    },
    InputNumber: {
      colorBorder: "#666666",
      colorBgContainer: "#12203b", // Number input background
      colorText: "#ffffff", // Number input text
    },
    Select: {
      colorBorder: "#2563EB",
      borderRadius: 8,
      controlHeight: 40,
      colorTextPlaceholder: "#999999",
      colorBgContainer: "#12203b", // Select input background
      colorText: "#ffffff", // Select text color
      // Dropdown styles
      colorBgElevated: "#12203b", // Dropdown background color
      colorTextQuaternary: "#ffffff", // Option text color
      controlItemBgHover: "#1a2d4e", // Option hover background
      controlItemBgActive: "#2563EB", // Selected option background
      colorPrimaryHover: "#2563EB", // Hover border color
      optionSelectedColor: "#ffffff", // Selected option text color
      optionSelectedBg: "#2563EB", // Selected option background
    },
    DatePicker: {
      colorBorder: "#2563EB",
      colorTextPlaceholder: "#999999",
      colorIcon: "#2563EB",
      activeBg: "rgba(37, 99, 235, 0.1)",
      colorBgContainer: "#12203b", // Date picker background
      colorText: "#ffffff", // Date picker text
    },
    Collapse: {
      colorText: "#ffffff",
      colorIcon: "#ffffff",
      headerBg: "transparent",
      colorBorder: "#303030",
      colorFillAlter: "transparent",
    },
    Modal: {
      colorBgContainer: "#12203b", // Modal background - your custom color
      colorBgElevated: "#12203b", // Elevated content background (same for consistency)
      colorText: "#ffffff", // Text color
      colorTextHeading: "#ffffff", // Heading text color
      colorIcon: "#999999", // Icon color
      colorIconHover: "#2563EB", // Icon hover color
      borderRadius: 20, // Border radius
      borderRadiusLG: 20, // Large border radius
      padding: 24, // Content padding
      paddingLG: 28, // Large padding
      fontSize: 16, // Font size
      fontSizeLG: 18, // Large font size
      lineHeight: 1.5, // Line height
      wireframe: false, // Disable wireframe style
    },
    Tabs: {
      itemActiveColor: "#2563EB",
      colorPrimary: "#2563EB",
      colorText: "#2563EB",
      colorTextHeading: "#2563EB",
      colorBorderSecondary: "#303030",
      itemColor: "#999999",
      itemSelectedColor: "#2563EB",
      itemHoverColor: "#2563EB",
      inkBarColor: "#2563EB",
      titleFontSize: 16,
      horizontalItemGutter: 32,
    },
    Drawer: {
      colorBgElevated: "#12203b",
      colorText: "#ffffff",
      colorTextHeading: "#ffffff",
      padding: 24,
      borderRadius: 8,
    },
  },
};

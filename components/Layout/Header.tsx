import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import LightLogo from "../../assets/logo/logo_light.png";
import DarkLogo from "../../assets/logo/logo_dark.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { FiCornerDownLeft, FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { userActions } from "../../store/userSlice";
import { expenseActions } from "../../store/expenseSlice";

export default function WithSubnavigation() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [placement, setPlacement] = React.useState("left");
  // const cart = useSelector((state: RootStateOrAny) => state.cart.cart);
  const isLoggedIn = useSelector(
    (state: RootStateOrAny) => state.user.isLoggedIn
  );
  const toast = useToast();
  const user = useSelector((state: RootStateOrAny) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const signOutHandler = () => {
    dispatch(userActions.logout());
    dispatch(expenseActions.clearExpenses(""));
    // dispatch(cartActions.emptyCart({}));
    // dispatch(shippingActions.clearShipping());
    // dispatch(orderActions.removeOrder({}));
    toast({
      title: "Logged out successfully.",
      description: `See you soon, ${user.firstName}!`,
      position: "top",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // axios
    //   .put(`${process.env.NEXT_PUBLIC_API}/users/saveCart`, {
    //     cart,
    //     user: user._id,
    //   })
    //   .then(({ data }) => {})
    //   .catch((err) => {});
    router.push("/login");
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 4 }}
        px={{ base: 6 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", lg: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align={"center"}
        >
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Link href="/" cursor={"pointer"} _focus={{ boxShadow: "none" }}>
              <Image
                src={colorMode === "light" ? LightLogo : DarkLogo}
                alt={"SBInsights Logo"}
                height={"40px"}
                width={"140px"}
              />
            </Link>
          </Text>

          <Flex display={{ base: "none", lg: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          align={"center"}
        >
          {/* <Link href="/cart" _focus={{ boxShadow: "none" }}>
            <Box position={"relative"} zIndex={"100"}>
              {cart.length > 0 && (
                <Box
                  position={"absolute"}
                  top={"-.9rem"}
                  right={".1rem"}
                  zIndex={"-1"}
                >
                  <Box
                    bg={"red.200"}
                    py={"-1rem"}
                    px={".5rem"}
                    borderRadius={50}
                  >
                    {cart.length}
                  </Box>
                </Box>
              )}
            </Box>
          </Link> */}
          <Button
            size={"sm"}
            onClick={toggleColorMode}
            _focus={{
              boxShadow: "none",
            }}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>

          {user.isAdmin ? (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant={"ghost"}
                _hover={{
                  color: "green.200",
                  background: "none",
                }}
                _active={{
                  background: "none",
                }}
                _focus={{ boxShadow: "none" }}
              >
                Admin
              </MenuButton>
              <MenuList>
                <Link
                  href={"/admin/dashboard"}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  <MenuItem>Dashboard</MenuItem>
                </Link>
                <Link
                  href={"/admin/products"}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  <MenuItem>Products</MenuItem>
                </Link>
                <Link
                  href={"/admin/orders"}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  <MenuItem>Orders</MenuItem>
                </Link>
                <Link
                  href={"/admin/users"}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  <MenuItem>Users</MenuItem>
                </Link>
                <MenuItem
                  onClick={signOutHandler}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : isLoggedIn ? (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant={"ghost"}
                _hover={{
                  color: "green.200",
                  background: "none",
                }}
                _active={{
                  background: "none",
                }}
                _focus={{ boxShadow: "none" }}
              >
                {user.companyName}
              </MenuButton>
              <MenuList>
                {/* <Link
                  href={`/user/history/${user._id}`}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  <MenuItem>Order History</MenuItem>
                </Link> */}
                <Link
                  href={`/${user.slug}/profile`}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link
                  href={`/${user.slug}/invoice`}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  <MenuItem>Invoice settings</MenuItem>
                </Link>

                <MenuItem
                  onClick={signOutHandler}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={500}
                // color={"gray.600"}
                color={router.pathname === "/login" ? "blue.200" : "blue.600"}
                variant={"link"}
                href={"/login"}
                _focus={{ boxShadow: "none" }}
                _hover={{
                  color: "blue.200",
                }}
              >
                Login
              </Button>
              <Link
                href="/signup"
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Button
                  size={"sm"}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  bg={process.env.NEXT_PUBLIC_BTN}
                  _hover={{
                    bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                  }}
                  _active={{
                    bg: process.env.NEXT_PUBLIC_BTN_HOVER,
                  }}
                  _focus={{ boxShadow: "none" }}
                  color={"#fff"}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("green.200", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const router = useRouter();
  const path = router.asPath;

  return (
    <Stack direction={"row"} spacing={2}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                // color={linkColor}
                color={
                  router.asPath.includes(navItem.href) ? "green.200" : linkColor
                }
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                _focus={{ boxShadow: "none" }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("green.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "green.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"green.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _focus={{ boxShadow: "none" }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: "Adult Nutrition",
  //   children: [
  //     {
  //       label: "Juices",
  //       subLabel: "Juices that you wil love",
  //       href: "/shop/adult-juices",
  //     },
  //     {
  //       label: "Smoothies",
  //       subLabel: "Smoothiies that you wil love",
  //       href: "/shop/adult-smoothies",
  //     },
  //     {
  //       label: "Immunity Shots",
  //       subLabel: "Immunity Shots that you wil love",
  //       href: "/shop/adult-smoothies",
  //     },
  //   ],
  // },
  // {
  //   label: "Baby / Toddler Nutrition",
  //   children: [
  //     {
  //       label: "Jars / Pouches",
  //       subLabel: "Tasty baby food",
  //       href: "/shop/baby-toddler-nutrition",
  //     },
  //     {
  //       label: "Combo Packs",
  //       subLabel: "A great selection of different choices",
  //       href: "/combo/baby-toddler-combo-pack",
  //     },
  //     {
  //       label: "Subscription Jars",
  //       subLabel: "Tasty subscription Jars",
  //       href: "/shop/baby-toddler-subscription-jars",
  //     },
  //   ],
  // },
  // {
  //   label: "Nutrition Coaching",
  //   href: "#",
  // },
  // {
  //   label: "Roots Bundles",
  //   href: "/shop/roots-bundles",
  // },
  // {
  //   label: "Roots Foods",
  //   href: "/shop/roots-foods",
  // },
  // {
  //   label: "Gift Cards",
  //   href: "/shop/gift-cards",
  // },
  // {
  //   label: "About",
  //   href: "/about",
  // },
];

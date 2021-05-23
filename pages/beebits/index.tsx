import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import {
  Center,
  Grid,
  GridItem,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import BeebitItem from "../../components/beebit-item";
import Layout from "../../components/layout";

type Beebit = {
  imageURL: string;
  type: string;
  id: number;
};

const BEEBITS_PER_PAGE = 30;
const TOTAL_PAGES = Math.round(20000 / BEEBITS_PER_PAGE);

interface AllBeebitsProps {
  beebits: Beebit[];
  page: number;
}

const AllBeebits: React.FC<AllBeebitsProps> = ({ beebits, page }) => {
  const router = useRouter();

  const pageArray = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => index + page).filter(
        (p) => p <= TOTAL_PAGES
      ),
    [page]
  );

  useEffect(() => {
    if (page === 1) router.replace("/beebits");
  }, []);

  return (
    <Layout>
      <Head>
        <title>The Beebits - All Beebits</title>
      </Head>
      <VStack alignItems="flex-start" w="121.6rem" py="4.8rem" mt="-17.8rem">
        <Text color="white" fontWeight="bold" fontSize="4rem">
          All Beebits
        </Text>
        <Grid w="100%" gridTemplateColumns="repeat(6, 1fr)" gap="1rem">
          {beebits.map(({ id, imageURL, type }) => (
            <NextLink key={id} href={`/beebits/${id}`}>
              <Link>
                <BeebitItem imageURL={imageURL} type={type} id={id} />
              </Link>
            </NextLink>
          ))}
        </Grid>
        <HStack
          justifyContent="center"
          borderTop="1px solid rgba(0, 0, 0, .1)"
          w="100%"
          pt="3rem"
          mt="3rem"
          spacing="5rem"
        >
          {page > 1 ? (
            <NextLink href={`/beebits?page=${page - 1}`}>
              <Button
                background="transparent"
                border="1px solid #1F2A37"
                py="2rem"
                px="4rem"
                fontSize="1.4rem"
                color="#1F2A37"
                _hover={{ background: "#1F2A37", color: "#ffba00" }}
              >
                Previous
              </Button>
            </NextLink>
          ) : (
            <Center minW="14rem" />
          )}
          <HStack spacing="1.5rem">
            {pageArray.map((p) => (
              <NextLink key={p} href={`/beebits?page=${p}`}>
                <Button
                  boxSizing="content-box"
                  background={page === p ? "#1F2A37" : "transparent"}
                  border="1px solid #1F2A37"
                  rounded="full"
                  fontSize="2rem"
                  padding=".6rem"
                  color={page === p ? "#ffba00" : "#1F2A37"}
                  _hover={{
                    background: "#1F2A37",
                    color: "#ffba00",
                    outline: "ffba00",
                  }}
                >
                  {p}
                </Button>
              </NextLink>
            ))}
          </HStack>
          {page < TOTAL_PAGES ? (
            <NextLink href={`/beebits?page=${page + 1}`}>
              <Button
                background="transparent"
                border="1px solid #1F2A37"
                py="2rem"
                px="4rem"
                fontSize="1.4rem"
                color="#1F2A37"
                _hover={{ background: "#1F2A37", color: "#ffba00" }}
              >
                Next
              </Button>
            </NextLink>
          ) : (
            <Center minW="14rem" />
          )}
        </HStack>
      </VStack>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  AllBeebitsProps,
  { page: string }
> = async (ctx) => {
  try {
    const { page = "1" } = ctx.query as { page: string };
    let beebitsIds = Array.from({ length: BEEBITS_PER_PAGE }, (_, index) => {
      return BEEBITS_PER_PAGE * (parseInt(page) - 1) + (index + 1);
    });

    if (beebitsIds[0] > 20000) {
      return {
        redirect: {
          permanent: false,
          destination: "/beebits",
        },
      };
    }

    const beebits = await Promise.all(
      beebitsIds
        .filter((el) => el <= 20000)
        .map(
          async (id) =>
            await (
              await fetch(
                `${process.env.APP_URL}/beebits-min/beebits-${id}.json`
              )
            ).json()
        )
    );

    return {
      props: { beebits, page: parseInt(page) },
    };
  } catch (err) {
    return {
      props: { beebits: [], page: 1 },
    };
  }
};

export default AllBeebits;

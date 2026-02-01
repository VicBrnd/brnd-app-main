import {
  Body,
  Button,
  Container,
  Head,
  Html,
  pixelBasedPreset,
  Section,
  Tailwind,
} from "@react-email/components";

interface SignInEmailProps {
  SignInLink?: string;
}

export const SignInEmail = ({ SignInLink }: SignInEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded p-5">
            <Section className="mt-8 mb-8 text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={SignInLink}
              >
                Sign-in
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

SignInEmail.PreviewProps = {
  link: "test",
} as SignInEmailProps;

export default SignInEmail;

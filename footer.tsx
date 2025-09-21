import CardanoLogo from '@/components/icons/cardano-logo';

export default function Footer() {
  return (
    <footer className="flex h-20 items-center justify-center">
      <a
        href="https://cardano.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <p>Powered by</p>
        <CardanoLogo className="h-5 w-auto" />
      </a>
    </footer>
  );
}

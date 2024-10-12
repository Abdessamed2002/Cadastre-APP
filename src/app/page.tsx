import Header from './Components/Header';
import ActionButtons from './Components/ActionButtons';

const Home: React.FC = () => {
    return (
        <div>
            <Header />
            <main className="p-4">
                <h3 className="text-2xl font-semibold mb-2 text-center mt-10">Simplifiez vos demandes relatives aux biens fonciers</h3>
                <ActionButtons />
            </main>
        </div>
    );
};

export default Home;

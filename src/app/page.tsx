import Header from './Components/Header';
import ActionButtons from './Components/ActionButtons';

const Home: React.FC = () => {
    return (
        <div>
            <Header />
            <main className="p-4 md:p-8 lg:p-12"> {/* Adjust padding for different screen sizes */}
                <h3 className="text-xl md:text-3xl lg:text-4xl font-semibold mb-4 text-center mt-8"> {/* Text size adjustment */}
                    Simplifiez vos demandes relatives aux biens fonciers
                </h3>
                <ActionButtons />
            </main>
        </div>
    );
};

export default Home;
